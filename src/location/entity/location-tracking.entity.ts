// src/entities/location-tracking.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from 'typeorm';

@Entity('location_tracking')  // Ensure the entity matches the table name
export class LocationTracking {
  @PrimaryGeneratedColumn()
  id: number;  // This will map to the 'id' column in your table

  @Column()
  userId: number;  // Maps to the 'user_id' column in your table

  @Column()
  lat: string;  // Maps to the 'lat' column in your table

  @Column()
  long: string;  // Maps to the 'long' column in your table

  @Column()
  userAgent: string;  // Maps to the 'user_agent' column in your table

  @Column()
  projectId: bigint;  // Maps to the 'project_id' column in your table

  @Column()
  userTrackingId: number;  // Maps to the 'user_tracking_id' column in your table

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;
}
