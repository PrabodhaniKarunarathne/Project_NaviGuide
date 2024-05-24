package com.naviguide.naviguide.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                //.csrf().disable()
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(new AntPathRequestMatcher("/api/user/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/user/login")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/user/save")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/event/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/event/save")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/user/profile")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/user/deleteuser/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/user/matchpassword/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/event/updateevent/**/**/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/event/getevent/**/**/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/event/deleteevent/**/**/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/admin/saveadmin")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/admin/getalladmins")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/admin/deleteadmin/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/admin/matchsuperadminpassword")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/admin/countadmins")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/user/countusers")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/user/searchres")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/user/searchstake")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/admin/matchadminpassword")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/news/savenews")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/news/getallnews")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/news/deletenews/**/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/news/countnews")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/admin/getadminbyadminname/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/admin/login")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/admin/profile")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/event/getevents/**/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/review/save")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/user/setrate/**/**/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/review/getreviewcount/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/review/amountreview/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/review/getreviews/**")).permitAll()











                        .anyRequest().authenticated());
        return http.build();

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }



    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class).build();
    }


}
