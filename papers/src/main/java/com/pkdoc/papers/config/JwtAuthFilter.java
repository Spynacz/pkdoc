package com.pkdoc.papers.config;

import java.io.IOException;

import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JwtAuthFilter extends GenericFilterBean {

    private final UserAuthProvider userAuthProvider;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;

        String token;
        String header = httpRequest.getHeader(HttpHeaders.AUTHORIZATION);
        if (header != null && header.startsWith("Bearer")) {
            token = header.substring(7);
            SecurityContextHolder.getContext().setAuthentication(this.userAuthProvider.validateToken(token));
        }

        filterChain.doFilter(request, response);
    }
}
