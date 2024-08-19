import { v4 as uuid } from 'uuid';
import {
  CreateOrderDetailsPayload,
  UpdateOrderDetailsPayload,
} from '@orderDetailsApplication/orderDetails.usecase.interface';
import { OrderDetailsEntity } from './entities/orderDetails.entity';
import { OrderAuditEntity } from './entities/orderAudit.entity';
import { OrderEntity } from '@orderDomain/entities/order.entity';

export class OrderDetailsValue {
  public create = (
    orderDetailsPayload: CreateOrderDetailsPayload,
  ): OrderDetailsEntity => {
  
    const orderDetails: OrderDetailsEntity = {
      id: uuid(),
      audit: [],
      ...orderDetailsPayload
    };
  
    const audit: OrderAuditEntity = {
      id: uuid(),
      date: new Date().toISOString(),
      description: 'Created',
      responsible: 'ADMIN', // TODO: add responsible from token
      orderDetails: orderDetails,
    };
  
    orderDetails.audit.push(audit);
  
    return orderDetails;
  };

  public update = (
    orderDetails: OrderDetailsEntity,
    order: OrderEntity,
    orderDetailsPayload: UpdateOrderDetailsPayload,
  ): OrderDetailsEntity => {
    const { audit } = orderDetails;

    const auditEntities: OrderAuditEntity[] = audit.map((auditItem) => ({
      id: auditItem.id,
      date: auditItem.date,
      description: auditItem.description,
      orderDetails,
      responsible: auditItem.responsible,
    }));

    const newAudit = {
      id: uuid(),
      date: new Date().toISOString(),
      description: 'Update',
      orderDetails,
      responsible: 'ADMIN', // TODO: add responsible from token
    };

    auditEntities.push(newAudit);

    return {
      ...orderDetailsPayload,
      order,
      audit: auditEntities,
    };
  };
}
