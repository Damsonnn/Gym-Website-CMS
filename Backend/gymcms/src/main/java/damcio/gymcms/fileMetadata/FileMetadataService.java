package damcio.gymcms.fileMetadata;

import lombok.RequiredArgsConstructor;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import damcio.gymcms.exception.FileDeleteException;
import damcio.gymcms.exception.FileSaveException;
import damcio.gymcms.exception.ResourceNotFoundException;

@Service
@RequiredArgsConstructor
public class FileMetadataService {
    private final FileMetadataRepository fileMetadataRepository;

    private static final String IMAGE_FOLDER_PATH = "src/resources/static/images/"; 

    public FileMetadata createFile(MultipartFile file, String newName, String folderName){
        FileMetadata fileMetadata = new FileMetadata();
        fileMetadata.setName(StringUtils.cleanPath(file.getOriginalFilename()));
        String path = IMAGE_FOLDER_PATH + folderName + "/" + newName;
        fileMetadata.setPath(path);
        File savedFile = new File(path);
        try {
            file.transferTo(savedFile);
        }catch (IOException ex) {
            throw new FileSaveException("Couldn't save the file");
        }
        fileMetadataRepository.save(fileMetadata);
        return fileMetadata;
    }

    public void deleteFile(FileMetadata fileMetadata){
        if (fileMetadataRepository.existsById(fileMetadata.getId()))
            throw new ResourceNotFoundException("Couldn't find file information to delete");
        fileMetadataRepository.deleteById(fileMetadata.getId());
        try {
            Path path = Paths.get(fileMetadata.getPath());
            Files.delete(path);
        } catch (Exception ex) {
            throw new FileDeleteException("Couldn't delete a file - path or io problem");
        }
        
    }
}
