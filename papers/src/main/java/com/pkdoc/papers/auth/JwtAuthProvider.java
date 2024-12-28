package com.pkdoc.papers.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.pkdoc.papers.users.dtos.UserDTO;
import com.pkdoc.papers.users.UserService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import java.util.Optional;

@Component
public class JwtAuthProvider {

    @Value("${security.jwt.token.secret-key:secret-key}")
    private String secretKey;

    @Value("${security.jwt.token.expiry}")
    private Long jwtExpiry;

    @Value("${security.jwt.refresh-token.expiry}")
    private Long refreshExpiry;

    private final UserService userService;

    @Autowired
    public JwtAuthProvider(UserService userService) {
        this.userService = userService;
    }

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(String email) {
        Date now = new Date();
        Date expires = new Date(now.getTime() + jwtExpiry);

        return JWT.create()
                .withSubject(email)
                .withIssuedAt(now)
                .withExpiresAt(expires)
                .sign(Algorithm.HMAC256(secretKey));
    }

    public String createRefreshToken(String email) {
        Date now = new Date();
        Date expiresAt = new Date(now.getTime() + refreshExpiry);

        return JWT.create()
                .withSubject(email)
                .withIssuedAt(now)
                .withExpiresAt(expiresAt)
                .sign(Algorithm.HMAC256(secretKey));
    }

    public Authentication validateToken(String token) {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secretKey)).build();

        DecodedJWT decoded = verifier.verify(token);
        Optional<UserDTO> user = userService.findByEmail(decoded.getSubject());

        return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
    }

    // WARN: UNFINISHED METHOD - DOESN'T ACTUALLY VERIFY MUCH
    public boolean validateRefreshToken(String token) {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secretKey)).build();
        DecodedJWT decoded = verifier.verify(token);

        // TODO: add checking if refresh token wasn't reused

        return decoded.getIssuedAt().getTime() < new Date().getTime();
    }

    public String extractSubject(String token) {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secretKey)).build();
        DecodedJWT decoded = verifier.verify(token);
        return decoded.getSubject();
    }
}
