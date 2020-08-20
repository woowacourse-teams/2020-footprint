package wooteco.team.ittabi.legenoaroundhere.service;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import wooteco.team.ittabi.legenoaroundhere.dto.AreaResponse;


class AreaServiceTest extends ServiceTest {

    @Autowired
    private AreaService areaService;

    @DisplayName("Keyword 기준 조회 - 조회, 존재하는 키워드")
    @ParameterizedTest
    @CsvSource(value = {"서울특, 492", "송파, 14", "잠실, 1", "동, 427"})
    void searchAllAreaBy_ExistsKeyword_Success(String keyword, int expectedCount) {
        Page<AreaResponse> areas = areaService.searchAllArea(Pageable.unpaged(), keyword);
        assertThat(areas.getContent()).hasSize(expectedCount);
    }

    @DisplayName("Keyword 기준 조회 - 조회건이 없음, 존재하지 않는 키워드")
    @ParameterizedTest
    @ValueSource(strings = "마마마, 강남시, 서울시, 대한민국")
    void searchAllAreaBy_NotExistsKeyword_SearchAnything(String keyword) {
        Page<AreaResponse> areas = areaService.searchAllArea(Pageable.unpaged(), keyword);
        assertThat(areas.getContent()).hasSize(0);
    }
}