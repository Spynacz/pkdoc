package com.pkdoc.papers.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthFilter extends GenericFilterBean {

    private final JwtAuthProvider jwtAuthProvider;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;

        String header = httpRequest.getHeader(HttpHeaders.AUTHORIZATION);
        if (header != null && !header.isBlank() && header.startsWith("Bearer")) {
            String token = header.substring(7);
            SecurityContextHolder.getContext().setAuthentication(this.jwtAuthProvider.validateToken(token));
        }

        filterChain.doFilter(request, response);
    }
}
