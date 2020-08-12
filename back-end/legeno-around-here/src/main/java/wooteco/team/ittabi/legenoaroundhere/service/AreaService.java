package wooteco.team.ittabi.legenoaroundhere.service;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import wooteco.team.ittabi.legenoaroundhere.domain.area.Area;
import wooteco.team.ittabi.legenoaroundhere.dto.AreaResponse;
import wooteco.team.ittabi.legenoaroundhere.repository.AreaRepository;

@Service
@AllArgsConstructor
public class AreaService {

    private static final String DB_LIKE_FORMAT = "%%%s%%";

    private final AreaRepository areaRepository;

    public Page<AreaResponse> searchAllArea(Pageable pageable, String keyword) {
        String likeKeyword = String.format(DB_LIKE_FORMAT, keyword);
        Page<Area> areas = areaRepository.findAllByFullNameIsLike(pageable, likeKeyword);
        return areas.map(AreaResponse::of);
    }
}
