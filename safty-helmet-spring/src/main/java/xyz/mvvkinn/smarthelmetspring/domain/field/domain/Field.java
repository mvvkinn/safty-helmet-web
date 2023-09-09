package xyz.mvvkinn.smarthelmetspring.domain.field.domain;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "TB_FIELD")
public class Field {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Nonnull
    private String name;
    @Nonnull
    private String addressLine1;
    @Nonnull
    private String addressLine2;
    @Nonnull
    private String city;
    private String state;
    private String telephone;
    private String cardNo;
    private String cardHolder;
    @CreationTimestamp
    private LocalDateTime creationDateTime;
    @UpdateTimestamp
    private LocalDateTime updateDateTime;
}
