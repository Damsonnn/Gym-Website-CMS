package damcio.gymcms.security;

import damcio.gymcms.user.LoginUserDto;
import damcio.gymcms.user.User;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/auth")
@RestController
@RequiredArgsConstructor
public class AuthenticationController {
    private final JWTService jwtService;
    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setUserId(authenticatedUser.getId());
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());
        loginResponse.setRoleName(authenticatedUser.getRole().getName().toString());

        return ResponseEntity.ok(loginResponse);
    }
    
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam("email") String email) {
        authenticationService.resetPassword(email);
        return new ResponseEntity<>("Sent reset token", HttpStatus.OK);
    }
    
    @PutMapping("/reset-password")
    public ResponseEntity<String> resetPasswordChange(@RequestBody PasswordResetDto passwordResetDto) {
        authenticationService.resetPasswordChange(passwordResetDto.getToken(), passwordResetDto.getPassword());
        return new ResponseEntity<>("Password was changed", HttpStatus.OK);
    }
}
