import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import User from '@modules/users/infra/typeorm/entities/User'

@Entity('tools')
export default class Tools {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  user_id: string

  @OneToMany(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  title: string

  @Column()
  link: string

  @Column()
  description: string

  @Column('varchar', { array: true })
  tags: string[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
