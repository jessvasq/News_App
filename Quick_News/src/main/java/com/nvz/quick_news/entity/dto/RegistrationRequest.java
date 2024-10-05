package com.nvz.quick_news.entity.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationRequest {
    private Long userId;
    @NotEmpty
    private String username;
    @NotEmpty
    private String password;
    @Email
    private String email;
    private String profilePicture;
    private String language;

    public boolean isAdminRegistration(){
        return email.endsWith("@admin.com");
    }
}
