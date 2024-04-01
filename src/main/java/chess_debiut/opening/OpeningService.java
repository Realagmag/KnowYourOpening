package chess_debiut.opening;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class OpeningService {
    private final OpeningRepository openingRepository;

    @Autowired
    public OpeningService(OpeningRepository openingRepository) {
        this.openingRepository = openingRepository;
    }

    public List<Opening> getAllOpenings() {
        return openingRepository.findAll();
    }

    public void addNewOpening(Opening opening) {
        openingRepository.save(opening);
    }

    public void deleteOpening(Long openingId) {
        if (!openingRepository.existsById(openingId)){
            throw new IllegalStateException(
                    "Opening with id " + openingId + " does not exist."
            );
        }
        openingRepository.deleteById(openingId);
    }

    @Transactional
    public void updateOpening(Long openingId,
                              String name,
                              String moveSequence,
                              String description,
                              String startingSide) {
        Opening opening = openingRepository
                .findById(openingId).orElseThrow(() ->
                        new IllegalStateException(
                                "Opening with id " + openingId + " does not exist"));
        if (name != null && !name.isEmpty() && !Objects.equals(opening.getName(), name)) {
            opening.setName(name);
        }
        if (moveSequence != null && !moveSequence.isEmpty() && !Objects.equals(opening.getMoveSequence(), moveSequence)) {
            opening.setMoveSequence(moveSequence);
        }
        if (description != null && !description.isEmpty() && !Objects.equals(opening.getDescription(), description)) {
            opening.setDescription(description);
        }
        if (startingSide != null && !startingSide.isEmpty() && !Objects.equals(opening.getStartingSide(), startingSide)) {
            opening.setStartingSide(startingSide);
        }
    }

    public List<Opening> getOpeningsStartingWith(String nameFrag) {
        Optional<Opening> openingStartingWith = openingRepository.findOpeningStartingWith(nameFrag);
        return openingStartingWith.map(List::of).orElse(List.of());

    }
}
