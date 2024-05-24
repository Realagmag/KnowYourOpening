package chess_debiut.opening;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OpeningController {

    private final OpeningService openingService;

    @Autowired
    public OpeningController(OpeningService openingService) {
        this.openingService = openingService;
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/opening")
    public List<Opening> getAllOpenings(){
        return openingService.getAllOpenings();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/opening/user")
    public List<Opening> getUserOpenings(){
        System.out.println(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        return openingService.getAllOpenings();

    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/opening")
    public void addNewOpening(@RequestBody Opening opening){
        openingService.addNewOpening(opening);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/opening/{id}")
    public void deleteOpening(@PathVariable("id") Long openingId){
        openingService.deleteOpening(openingId);
    }

    @PutMapping("/opening/{id}")
    public void updateOpening(@PathVariable("id") Long openingId,
                              @RequestParam(required = false) String name,
                              @RequestParam(required = false) String moveSequence,
                              @RequestParam(required = false) String description,
                              @RequestParam(required = false) String startingSide){
        openingService.updateOpening(
                openingId,
                name,
                moveSequence,
                description,
                startingSide);
    }

    @GetMapping("/opening/{nameFrag}")
    public List<Opening> getOpeningsStartingWith(@PathVariable("nameFrag") String nameFrag){
        return openingService.getOpeningsStartingWith(nameFrag);
    }
}
