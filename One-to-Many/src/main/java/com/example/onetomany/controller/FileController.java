package com.example.onetomany.controller;

import com.example.onetomany.entity.Metadata;
import com.example.onetomany.service.MetaDataService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/api")
public class FileController {
    private final MetaDataService metadataservice;
    public FileController(MetaDataService metadataservice) {
        this.metadataservice = metadataservice;
    }
    @Value("${upload.path}") // Calea unde doriți să salvați fișierele, configurată în application.properties
    private String uploadPath;


    @PostMapping("/upload")

    public ResponseEntity<List<String>> uploadFile(@RequestParam("file") List<MultipartFile> files) {
        List<String> url = new ArrayList<>();

        for (MultipartFile file : files) {
            String uniqueFilename = "";
            try {
                if (!new File(uploadPath).exists()) {
                    new File(uploadPath).mkdirs();
                }
                String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());
                System.out.println(originalFileName);
                uniqueFilename = UUID.randomUUID().toString() + originalFileName;

                Path filePath = Path.of(uploadPath, uniqueFilename);
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                // Salvarea metadatelor în baza de date
                Metadata metadata = new Metadata();
                metadata.setFileName(uniqueFilename);
                metadata.setOriginalFileName(originalFileName);
                metadataservice.saveMetadata(metadata);
                System.out.println(metadata);
                String url1=originalFileName+" poate vizualizat la: http://localhost:8080/uploads/files/"+uniqueFilename;
                url.add(url1);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
        return ResponseEntity.ok(url);
    }
//    @GetMapping("/search-by-file-name")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
//    public List<Metadata> findByOriginalFileName(@RequestParam("fileName") String fileName) {
//        System.out.println(fileName);
//        return metadataservice.findByOriginalFileNameContaining(fileName);
//    }
    @GetMapping("/view")
    public List<Metadata> View() {
        return metadataservice.getAllFile();
    }

}
