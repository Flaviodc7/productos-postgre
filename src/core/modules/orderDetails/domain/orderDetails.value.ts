import { v4 as uuid } from 'uuid';
import {
  CreateOrderDetailsPayload,
  UpdateOrderDetailsPayload,
} from '@orderDetailsApplication/orderDetails.usecase.interface';
import { OrderDetailsEntity } from './entities/orderDetails.entity';
import { OrderDetailsModel } from '@models/orderDetails/orderDetails.model';
import { OrderAuditEntity } from './entities/orderAudit.entity';

export class OrderDetailsValue {
  public create = (
    orderDetailsPayload: CreateOrderDetailsPayload,
  ): OrderDetailsEntity => {
    return {
      id: uuid(),
      orderId: uuid(),
      ...orderDetailsPayload,
      audit: [
        {
          id: uuid(),
          date: new Date().toISOString(),
          description: 'Created',
          responsible: 'ADMIN', // TODO: add responsible from token
        },
      ],
    };
  };
  public update = (
    orderDetailsModel: OrderDetailsModel,
    orderDetailsPayload: UpdateOrderDetailsPayload,
  ): OrderDetailsEntity => {
    const { audit } = orderDetailsModel;

    const auditEntities: OrderAuditEntity[] = audit.map((auditItem) => ({
      id: auditItem.id,
      date: auditItem.date,
      description: auditItem.description,
      responsible: auditItem.responsible,
    }));

    const newAudit = {
      id: uuid(),
      date: new Date().toISOString(),
      description: 'Update',
      responsible: 'ADMIN', // TODO: add responsible from token
    };

    auditEntities.push(newAudit);

    return {
      ...orderDetailsPayload,
      audit: auditEntities,
    };
  };
}
