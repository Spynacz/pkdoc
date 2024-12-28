package com.pkdoc.papers.auth;

import com.auth0.jwt.exceptions.TokenExpiredException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        boolean isRefreshRequest = "/api/refresh".equals(httpRequest.getRequestURI());

        String header = httpRequest.getHeader(HttpHeaders.AUTHORIZATION);
        if (header != null && !header.isBlank() && header.startsWith("Bearer")) {
            String token = header.substring(7);
            try {
                SecurityContextHolder.getContext().setAuthentication(this.jwtAuthProvider.validateToken(token));
            } catch (TokenExpiredException e) {
                if (!isRefreshRequest) {
                    httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    httpResponse.getWriter().write("Unauthorized: Token has expired.");
                    return;
                }
            }
        }
        filterChain.doFilter(request, response);
    }
}
