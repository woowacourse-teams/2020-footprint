package wooteco.team.ittabi.legenoaroundhere.domain.area;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.MapKeyEnumerated;
import javax.persistence.OneToMany;
import wooteco.team.ittabi.legenoaroundhere.domain.BaseEntity;

@Entity
public class Area extends BaseEntity {

    private static final int MIN_SIZE = 1;
    static final String NOT_ALLOWED_NULL = "이름에 null은 허용되지 않습니다.";
    static final String INVALID_SIZE_ERROR = String
        .format("region의 갯수가 최소 갯수인 %d보다 작습니다.", MIN_SIZE);

    @OneToMany(mappedBy = "area")
    @MapKeyEnumerated(EnumType.STRING)
    public final Map<RegionDepth, RegionalRelationship> regions;

    protected Area() {
        this.regions = new HashMap<>();
    }

    protected Area(Map<RegionDepth, RegionalRelationship> regions) {
        validate(regions);
        this.regions = regions;
    }

    //todo: check
    RegionalRelationship getSmallestRegion() {
        RegionDepth smallestRegionDepth = regions.keySet().stream()
            .max(RegionDepth::compareTo)
            .orElseThrow(() -> new IllegalStateException("Region이 존재하지 않습니다."));
        return regions.get(smallestRegionDepth);
    }

    private void validate(Map<RegionDepth, RegionalRelationship> regions) {
        validateNull(regions);
        validateSize(regions);
    }

    private void validateNull(Map<RegionDepth, RegionalRelationship> regions) {
        if (Objects.isNull(regions)) {
            throw new IllegalArgumentException(NOT_ALLOWED_NULL);
        }
    }

    private void validateSize(Map<RegionDepth, RegionalRelationship> regions) {
        if (isNotValidSize(regions)) {
            throw new IllegalArgumentException(INVALID_SIZE_ERROR);
        }
    }

    private boolean isNotValidSize(Map<RegionDepth, RegionalRelationship> regions) {
        return regions.size() < MIN_SIZE;
    }

    @Override
    public String toString() {
        return "Area{" +
            "regions=" + regions +
            '}';
    }
}
