package wooteco.team.ittabi.legenoaroundhere.service;

import java.util.concurrent.ThreadLocalRandom;
import javax.mail.MessagingException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wooteco.team.ittabi.legenoaroundhere.domain.user.Email;
import wooteco.team.ittabi.legenoaroundhere.domain.user.User;
import wooteco.team.ittabi.legenoaroundhere.domain.user.mailauth.MailAuth;
import wooteco.team.ittabi.legenoaroundhere.dto.MailAuthCheckRequest;
import wooteco.team.ittabi.legenoaroundhere.dto.MailAuthCreateRequest;
import wooteco.team.ittabi.legenoaroundhere.exception.FailedSendMailException;
import wooteco.team.ittabi.legenoaroundhere.exception.NotExistsException;
import wooteco.team.ittabi.legenoaroundhere.exception.WrongUserInputException;
import wooteco.team.ittabi.legenoaroundhere.repository.MailAuthRepository;
import wooteco.team.ittabi.legenoaroundhere.repository.UserRepository;
import wooteco.team.ittabi.legenoaroundhere.utils.MailHandler;

@Service
@AllArgsConstructor
@Slf4j
public class MailAuthService {

    private static final int AUTH_NUMBER_MIN = 100_000;
    private static final int AUTH_NUMBER_RANGE = 900_000;

    private final JavaMailSender javaMailSender;
    private final MailAuthRepository mailAuthRepository;
    private final UserRepository userRepository;

    @Transactional
    public void publishAuth(MailAuthCreateRequest mailAuthCreateRequest) {
        int authNumber = makeRandomAuthNumber();
        String email = mailAuthCreateRequest.getEmail();

        saveMailAuth(email, authNumber);
        sendAuthMail(email, authNumber);
    }

    private void saveMailAuth(String email, int authNumber) {
        MailAuth mailAuth = new MailAuth(email, authNumber);
        mailAuthRepository.save(mailAuth);
    }

    private void sendAuthMail(String email, int authNumber) {
        try {
            MailHandler mailHandler = new MailHandler(javaMailSender);
            mailHandler.setTo(email);
            mailHandler.setSubject("우리동네캡짱 회원 가입 인증 메일");
            mailHandler.setText(
                "<a href='https://www.capzzang.co.kr/mail-auth/check?"
                    + "email=" + email
                    + "&authNumber=" + authNumber
                    + "'>인증하기</a>");
            mailHandler.send();
        } catch (MessagingException e) {
            throw new FailedSendMailException("인증 메일 전송에 실패하였습니다.");
        }
    }

    private int makeRandomAuthNumber() {
        return AUTH_NUMBER_MIN + ThreadLocalRandom.current().nextInt(AUTH_NUMBER_RANGE);
    }

    @Transactional
    public void checkAuth(MailAuthCheckRequest mailAuthCheckRequest) {
        Email email = new Email(mailAuthCheckRequest.getEmail());
        MailAuth mailAuth = mailAuthRepository.findByEmail(email)
            .orElseThrow(() -> new NotExistsException("올바르지 않은 이메일입니다."));

        validateAuthNumber(mailAuth, mailAuthCheckRequest.getAuthNumber());
        updateUserEmailAuthPassed(email);
    }

    private void validateAuthNumber(MailAuth mailAuth, Integer AuthNumber) {
        if (mailAuth.isDifferentAuthNumber(AuthNumber)) {
            throw new WrongUserInputException("인증 정보가 일치하지 않습니다.");
        }
    }

    private void updateUserEmailAuthPassed(Email email) {
        User foundUser = userRepository.findByEmail(email)
            .orElseThrow(() -> new NotExistsException("존재하지 않는 회원입니다."));
        foundUser.setAuthenticatedByEmail(Boolean.TRUE);
    }
}
