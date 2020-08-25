package wooteco.team.ittabi.legenoaroundhere.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static wooteco.team.ittabi.legenoaroundhere.utils.constants.AreaConstants.TEST_AREA_ID;
import static wooteco.team.ittabi.legenoaroundhere.utils.constants.AreaConstants.TEST_AUTH_NUMBER;
import static wooteco.team.ittabi.legenoaroundhere.utils.constants.CommentConstants.TEST_COMMENT_OTHER_WRITING;
import static wooteco.team.ittabi.legenoaroundhere.utils.constants.CommentConstants.TEST_COMMENT_WRITING;
import static wooteco.team.ittabi.legenoaroundhere.utils.constants.ImageConstants.TEST_IMAGE_EMPTY_MULTIPART_FILES;
import static wooteco.team.ittabi.legenoaroundhere.utils.constants.PostConstants.TEST_POST_INVALID_ID;
import static wooteco.team.ittabi.legenoaroundhere.utils.constants.PostConstants.TEST_POST_WRITING;
import static wooteco.team.ittabi.legenoaroundhere.utils.constants.SectorConstants.TEST_SECTOR_REQUEST;
import static wooteco.team.ittabi.legenoaroundhere.utils.constants.UserConstants.TEST_USER_EMAIL;
import static wooteco.team.ittabi.legenoaroundhere.utils.constants.UserConstants.TEST_USER_NICKNAME;
import static wooteco.team.ittabi.legenoaroundhere.utils.constants.UserConstants.TEST_USER_OTHER_EMAIL;
import static wooteco.team.ittabi.legenoaroundhere.utils.constants.UserConstants.TEST_USER_PASSWORD;

import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import wooteco.team.ittabi.legenoaroundhere.domain.user.User;
import wooteco.team.ittabi.legenoaroundhere.domain.user.mailauth.MailAuth;
import wooteco.team.ittabi.legenoaroundhere.dto.CommentRequest;
import wooteco.team.ittabi.legenoaroundhere.dto.CommentResponse;
import wooteco.team.ittabi.legenoaroundhere.dto.CommentZzangResponse;
import wooteco.team.ittabi.legenoaroundhere.dto.PostCreateRequest;
import wooteco.team.ittabi.legenoaroundhere.dto.PostResponse;
import wooteco.team.ittabi.legenoaroundhere.dto.UserResponse;
import wooteco.team.ittabi.legenoaroundhere.exception.NotAuthorizedException;
import wooteco.team.ittabi.legenoaroundhere.exception.NotAvailableException;
import wooteco.team.ittabi.legenoaroundhere.exception.NotExistsException;
import wooteco.team.ittabi.legenoaroundhere.repository.MailAuthRepository;

public class CommentServiceTest extends ServiceTest {

    private static final String TEST_PREFIX = "comment_";

    private User user;
    private User another;
    private Long postId;

    @Autowired
    private SectorService sectorService;

    @Autowired
    private PostService postService;

    @Autowired
    private CommentService commentService;

    @MockBean
    MailAuthRepository mailAuthRepository;

    @BeforeEach
    void setUp() {
        MailAuth mailAuth = new MailAuth(TEST_USER_EMAIL, TEST_AUTH_NUMBER);
        when(mailAuthRepository.findByEmail(any())).thenReturn(java.util.Optional.of(mailAuth));

        user = createUser(TEST_PREFIX + TEST_USER_EMAIL, TEST_USER_NICKNAME, TEST_USER_PASSWORD);
        another = createUser(TEST_PREFIX + TEST_USER_OTHER_EMAIL, TEST_USER_NICKNAME,
            TEST_USER_PASSWORD);
        setAuthentication(user);

        Long sectorId = sectorService.createSector(TEST_SECTOR_REQUEST).getId();
        PostCreateRequest postCreateRequest
            = new PostCreateRequest(TEST_POST_WRITING, TEST_IMAGE_EMPTY_MULTIPART_FILES,
            TEST_AREA_ID, sectorId);
        postId = postService.createPost(postCreateRequest).getId();
    }

    @DisplayName("댓글 생성 - 성공")
    @Test
    void createComment_SuccessToCreate() {
        CommentRequest commentRequest = new CommentRequest(TEST_COMMENT_WRITING);

        CommentResponse comment = commentService.createComment(postId, commentRequest);

        assertThat(comment.getId()).isNotNull();
        assertThat(comment.getWriting()).isEqualTo(TEST_COMMENT_WRITING);
        assertThat(comment.getCreator()).isEqualTo(UserResponse.from(user));
        assertThat(comment.getZzang()).isNotNull();
        assertThat(comment.getCocomments()).isEmpty();
        assertThat(comment.isDeleted()).isFalse();
    }

    @DisplayName("댓글 생성 - 예외 발생, 유효하지 않은 게시글 ID")
    @Test
    void createComment_InvalidPostId_ThrownException() {
        CommentRequest commentRequest = new CommentRequest(TEST_COMMENT_WRITING);

        assertThatThrownBy(() ->
            commentService.createComment(TEST_POST_INVALID_ID, commentRequest))
            .isInstanceOf(NotExistsException.class);
    }

    @DisplayName("하위 댓글 작성, 성공")
    @Test
    void createCocomment_Success() {
        CommentRequest commentRequest = new CommentRequest(TEST_COMMENT_WRITING);
        Long commentId = commentService.createComment(postId, commentRequest).getId();
        CommentResponse cocomment = commentService.createCocomment(commentId, commentRequest);

        assertThat(cocomment.getWriting()).isEqualTo(TEST_COMMENT_WRITING);
        assertThat(cocomment.getCocomments()).isEmpty();

        CommentResponse comment = commentService.findComment(commentId);

        assertThat(comment.getWriting()).isEqualTo(TEST_COMMENT_WRITING);
        assertThat(comment.getCocomments()).hasSize(1);

        cocomment = comment.getCocomments().get(0);
        assertThat(cocomment.getWriting()).isEqualTo(TEST_COMMENT_WRITING);
        assertThat(cocomment.getCocomments()).isEmpty();
    }

    @DisplayName("하위 댓글 작성, 예외 발생 - 유효하지 않은 상위 댓글 ID")
    @Test
    void createCocomment_InvalidSuperCommentId_ThrownException() {
        CommentRequest commentRequest = new CommentRequest(TEST_COMMENT_WRITING);
        Long commentId = commentService.createComment(postId, commentRequest).getId();
        commentService.deleteComment(commentId);

        assertThatThrownBy(() -> commentService.createCocomment(commentId, commentRequest))
            .isInstanceOf(NotExistsException.class);
    }

    @DisplayName("하위 댓글 작성, 예외 발생 - 삭제된 상태의 상위 댓글 ID")
    @Test
    void createCocomment_IsDeletedSuperCommentId_ThrownException() {
        CommentRequest commentRequest = new CommentRequest(TEST_COMMENT_WRITING);
        Long commentId = commentService.createComment(postId, commentRequest).getId();
        commentService.createCocomment(commentId, commentRequest);
        commentService.deleteComment(commentId);

        CommentResponse comment = commentService.findComment(commentId);
        assertThat(comment.isDeleted()).isTrue();

        assertThatThrownBy(() -> commentService.createCocomment(commentId, commentRequest))
            .isInstanceOf(NotAvailableException.class);
    }

    @DisplayName("댓글 조회 - 성공")
    @Test
    void findComment_SuccessToFind() {
        CommentRequest commentRequest = new CommentRequest(TEST_COMMENT_WRITING);
        CommentResponse createdComment = commentService.createComment(postId, commentRequest);
        CommentResponse foundComment = commentService.findComment(createdComment.getId());

        assertThat(foundComment.getId()).isEqualTo(createdComment.getId());
        assertThat(foundComment.getWriting()).isEqualTo(createdComment.getWriting());
        assertThat(foundComment.getCreator()).isEqualTo(createdComment.getCreator());
        assertThat(foundComment.getZzang()).isEqualTo(createdComment.getZzang());
        assertThat(foundComment.getCocomments()).isEqualTo(createdComment.getCocomments());
        assertThat(foundComment.isDeleted()).isEqualTo(createdComment.isDeleted());
    }

    @DisplayName("댓글 조회 - 성공, POST ID로 조회 후 댓글 개수 확인")
    @Test
    void findPost_FindByPostID_SuccessToFind() {
        CommentRequest commentRequest = new CommentRequest(TEST_COMMENT_WRITING);

        Long commentId = commentService.createComment(postId, commentRequest).getId();
        commentService.createComment(postId, commentRequest);
        commentService.createComment(postId, commentRequest);
        commentService.deleteComment(commentId);

        PostResponse foundPostResponse = postService.findPost(postId);
        assertThat(foundPostResponse.getComments()).hasSize(2);
    }

    @DisplayName("댓글 조회 - 실패, 찾는 Comment가 이미 삭제 됐을 경우")
    @Test
    void findComment_AlreadyDeletedComment_ThrownException() {
        CommentRequest commentRequest = new CommentRequest(TEST_COMMENT_WRITING);
        Long commentId = commentService.createComment(postId, commentRequest).getId();
        commentService.deleteComment(commentId);

        assertThatThrownBy(() -> commentService.findComment(commentId))
            .isInstanceOf(NotExistsException.class);
    }

    @DisplayName("댓글 조회 - 실패, 찾는 Comment ID가 없을 경우")
    @Test
    void findComment_HasNotCommentId_ThrownException() {
        assertThatThrownBy(() -> commentService.findComment(TEST_POST_INVALID_ID))
            .isInstanceOf(NotExistsException.class);
    }

    @DisplayName("댓글 목록 조회 - 성공")
    @Test
    void findAllComment_SuccessToFind() {
        CommentRequest commentRequest = new CommentRequest(TEST_COMMENT_WRITING);
        commentService.createComment(postId, commentRequest);

        List<CommentResponse> comments = commentService.findAllCommentBy(postId);

        assertThat(comments).hasSize(1);
    }

    @DisplayName("댓글 삭제 - 성공, 하위 댓글이 없는 경우")
    @Test
    void deleteComment_HasNoCocomment_SuccessToDelete() {
        CommentRequest commentRequest = new CommentRequest(TEST_COMMENT_WRITING);
        Long commentId = commentService.createComment(postId, commentRequest).getId();

        commentService.deleteComment(commentId);

        List<CommentResponse> comments = commentService.findAllCommentBy(postId);
        assertThat(comments).hasSize(0);
    }

    @DisplayName("댓글 삭제 - 삭제된 상태로 변경, 하위 댓글이 있는 경우")
    @Test
    void deleteComment_HasCocomment_TurnToDeleted() {
        CommentRequest commentRequest = new CommentRequest(TEST_COMMENT_WRITING);
        Long commentId = commentService.createComment(postId, commentRequest).getId();
        commentService.createCocomment(commentId, commentRequest);

        commentService.deleteComment(commentId);

        List<CommentResponse> comments = commentService.findAllCommentBy(postId);
        assertThat(comments).hasSize(1);

        CommentResponse comment = commentService.findComment(commentId);
        assertThat(comment.getWriting()).isNull();
        assertThat(comment.getZzang()).isNull();
        assertThat(comment.getCreator()).isNull();
        assertThat(comment.getCreatedAt()).isNull();
        assertThat(comment.getModifiedAt()).isNull();
        assertThat(comment.getCocomments()).hasSize(1);
        assertThat(comment.isDeleted()).isTrue();
    }

    @DisplayName("댓글 삭제 - 삭제, 삭제된 상태에서 하위 댓글이 모두 삭제되는 경우")
    @Test
    void deleteComment_IsDeletedAndCocommentAllDelete_SuccessToDelete() {
        CommentRequest commentRequest = new CommentRequest(TEST_COMMENT_WRITING);
        Long commentId = commentService.createComment(postId, commentRequest).getId();
        Long cocommentId = commentService.createCocomment(commentId, commentRequest).getId();

        commentService.deleteComment(commentId);
        commentService.deleteComment(cocommentId);

        assertThatThrownBy(() -> commentService.findComment(cocommentId))
            .isInstanceOf(NotExistsException.class);
        assertThatThrownBy(() -> commentService.findComment(commentId))
            .isInstanceOf(NotExistsException.class);
        assertThat(commentService.findAllCommentBy(postId)).isEmpty();
    }

    @DisplayName("댓글 삭제 - 삭제되진 않음, 삭제된 상태에서 하위 댓글이 일부 삭제되는 경우")
    @Test
    void deleteComment_IsDeletedAndCocommentSomeDelete_Nothing() {
        CommentRequest commentRequest = new CommentRequest(TEST_COMMENT_WRITING);
        Long commentId = commentService.createComment(postId, commentRequest).getId();

        commentService.createCocomment(commentId, commentRequest);
        Long cocommentId = commentService.createCocomment(commentId, commentRequest).getId();

        commentService.deleteComment(commentId);
        commentService.deleteComment(cocommentId);

        assertThatThrownBy(() -> commentService.findComment(cocommentId))
            .isInstanceOf(NotExistsException.class);
        assertThat(commentService.findComment(commentId).getCocomments()).hasSize(1);
        assertThat(commentService.findAllCommentBy(postId)).hasSize(1);
    }

    @DisplayName("댓글 삭제 - 삭제, 하위 댓글의 경우")
    @Test
    void deleteComment_IsCocomment_SuccessToDelete() {
        CommentRequest commentRequest = new CommentRequest(TEST_COMMENT_WRITING);
        Long commentId = commentService.createComment(postId, commentRequest).getId();
        Long cocommentId = commentService.createCocomment(commentId, commentRequest).getId();

        commentService.deleteComment(cocommentId);

        List<CommentResponse> comments = commentService.findAllCommentBy(postId);
        assertThat(comments).hasSize(1);

        CommentResponse comment = commentService.findComment(commentId);
        assertThat(comment.getWriting()).isEqualTo(TEST_COMMENT_WRITING);
        assertThat(comment.getCocomments()).isEmpty();
        assertThat(comment.isDeleted()).isFalse();

        assertThatThrownBy(() -> commentService.findComment(cocommentId))
            .isInstanceOf(NotExistsException.class);
    }

    @DisplayName("댓글 삭제 - 실패, 댓글 작성자가 아님")
    @Test
    void deleteComment_IfNotCreator_ThrowException() {
        CommentRequest commentRequest = new CommentRequest(TEST_COMMENT_WRITING);
        Long commentId = commentService.createComment(postId, commentRequest).getId();

        setAuthentication(another);
        assertThatThrownBy(() -> commentService.deleteComment(commentId))
            .isInstanceOf(NotAuthorizedException.class);
    }


    @DisplayName("비활성화된 좋아요를 활성화")
    @Test
    void pressCommentZzang_activeCommentZzang_SuccessToActiveCommentZzang() {
        CommentRequest commentRequest = new CommentRequest(TEST_COMMENT_WRITING);

        Long commentId = commentService.createComment(postId, commentRequest).getId();

        commentService.pressZzang(commentId);

        CommentResponse comment = commentService.findComment(commentId);
        CommentZzangResponse zzang = comment.getZzang();

        assertThat(zzang.getCount()).isEqualTo(1L);
        assertThat(zzang.isActivated()).isTrue();
    }

    @DisplayName("활성화된 좋아요를 비활성화")
    @Test
    void pressCommentZzang_inactiveCommentZzang_SuccessToInactiveCommentZzang() {
        CommentRequest commentRequest = new CommentRequest(TEST_COMMENT_WRITING);

        Long commentId = commentService.createComment(postId, commentRequest).getId();

        commentService.pressZzang(commentId);
        commentService.pressZzang(commentId);

        CommentResponse comment = commentService.findComment(commentId);
        CommentZzangResponse zzang = comment.getZzang();

        assertThat(zzang.getCount()).isEqualTo(0L);
        assertThat(zzang.isActivated()).isFalse();
    }

    @DisplayName("코멘트 내용 변경, 성공")
    @Test
    void updateComment_ChangeWriting_Success() {
        CommentRequest commentRequest = new CommentRequest(TEST_COMMENT_WRITING);
        Long commentId = commentService.createComment(postId, commentRequest).getId();

        CommentRequest commentUpdateRequest = new CommentRequest(TEST_COMMENT_OTHER_WRITING);
        CommentResponse comment = commentService.updateComment(commentId, commentUpdateRequest);

        assertThat(comment.getWriting()).isEqualTo(TEST_COMMENT_OTHER_WRITING);
    }
}
