import { BaseEntity, PrimaryColumn, Entity, CreateDateColumn } from 'typeorm';

@Entity()
export class UserRoleLike extends BaseEntity {
  @PrimaryColumn('uuid')
  public userId!: string;
  
  @PrimaryColumn('uuid')
  public roleId!: string;
  
  @CreateDateColumn({ type: 'timestamp' })
  likedAt!: Date;
}
