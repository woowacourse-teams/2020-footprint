package wooteco.team.ittabi.legenoaroundhere.domain.user;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static wooteco.team.ittabi.legenoaroundhere.utils.constants.UserConstants.TEST_USER_NICKNAME;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class NicknameTest {

    @Test
    @DisplayName("생성자 테스트")
    void constructor() {
        assertThat(new Nickname(TEST_USER_NICKNAME)).isInstanceOf(Nickname.class);
    }

    @Test
    @DisplayName("생성자 테스트 - 닉네임이 null 일 때")
    void constructor_IfNull_ThrowException() {
        assertThatThrownBy(() -> new Nickname(null))
            .isInstanceOf(IllegalArgumentException.class)
            .hasMessage("닉네임이 null 입니다.");
    }

    @Test
    @DisplayName("생성자 테스트 - 닉네임이 비어있을 때")
    void constructor_IfBlank_ThrowException() {
        assertThatThrownBy(() -> new Nickname(""))
            .isInstanceOf(IllegalArgumentException.class)
            .hasMessage("닉네임이 비어있습니다.");
    }

    @ParameterizedTest
    @DisplayName("생성자 테스트 - 닉네임에 사용할 수 없는 특수문자가 포함되었을 때")
    @ValueSource(strings = {"&히", "히=히", "히히_", "히히\'", "히-히", "히+히", ",", "<", ">", ".."})
    void constructor_IfExistSpace_ThrowException(String input) {
        assertThatThrownBy(() -> new Nickname(input))
            .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    @DisplayName("생성자 테스트 - 닉네임이 30글자를 초과했을 때")
    void constructor_IfLengthIsMoreThanMaximum_ThrowException() {
        assertThatThrownBy(() -> new Nickname("1234567890123456789012345678901"))
            .isInstanceOf(IllegalArgumentException.class)
            .hasMessage("닉네임은 30글자 이하여야 합니다.");
    }
}
