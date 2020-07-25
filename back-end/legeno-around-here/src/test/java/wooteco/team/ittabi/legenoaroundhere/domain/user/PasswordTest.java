package wooteco.team.ittabi.legenoaroundhere.domain.user;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static wooteco.team.ittabi.legenoaroundhere.constants.UserTestConstants.TEST_PASSWORD;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class PasswordTest {

    @Test
    @DisplayName("생성자 테스트")
    void constructor() {
        assertThat(new Password(TEST_PASSWORD)).isInstanceOf(Password.class);
    }

    @Test
    @DisplayName("생성자 테스트 - 패스워드가 null일 때")
    void constructor_IfPasswordIsNull_ThrowException() {
        assertThatThrownBy(() -> new Password(null))
            .isInstanceOf(IllegalArgumentException.class)
            .hasMessage("password가 null 입니다.");
    }
}
