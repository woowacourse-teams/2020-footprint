package wooteco.team.ittabi.legenoaroundhere;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class LegenoAroundHereApplication {

    public static void main(String[] args) {
        SpringApplication.run(LegenoAroundHereApplication.class, args);
    }
}
