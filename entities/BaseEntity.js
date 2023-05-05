const BaseEntity =  {
  createdAt: {
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: true,
    createDate: true,
  },
  updatedAt: {
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: true,
    updateDate: true,
  },
  deletedAt: {
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    deleteDate: true,
  },
};

module.exports = BaseEntity;
  