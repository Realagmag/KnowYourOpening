package chess_debiut.opening;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.List;

@Configuration
public class OpeningConfig {
    @Bean
    CommandLineRunner commandLineRunner(OpeningRepository repository){
        return args ->{
            Opening opening = new Opening(
                    "Obrona Skandynawska",
                    "e2-e4d7-d5e4-d5d8-d5",
                    "Skandynaw jest swietny",
                    "White",
                    0L,
                    0L,
                    LocalDate.of(2022, 3, 16),
                    LocalDate.of(2020, 1, 1)
                    );
        repository.saveAll(
                List.of(opening)
        );
        };
    }
}
