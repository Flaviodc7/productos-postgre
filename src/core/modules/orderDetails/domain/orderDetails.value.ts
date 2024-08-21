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
    const { payment, delivery, products, ...restPayload } = orderDetailsPayload

    const orderPayment = {
      ...payment,
      id: uuid(),
    }

    const orderDelivery = {
      id: uuid(),
      ...delivery
    }

    const orderDetails: OrderDetailsEntity = {
      id: uuid(),
      audit: [],
      delivery: orderDelivery,
      payment: orderPayment,
      products: [],
      ...restPayload,
    };

    const orderProducts = products.map(product => {
      return {
        id: uuid(),
        sku: product.sku,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        details: orderDetails
      };
    });

    orderDetails.products = orderProducts;

    const audit: OrderAuditEntity = {
      id: uuid(),
      date: new Date().toISOString(),
      description: 'Created',
      responsible: 'ADMIN', // TODO: add responsible from token
      details: orderDetails,
    };

    orderDetails.audit.push(audit);

    return orderDetails;
  };

  public update = (
    details: OrderDetailsEntity,
    order: OrderEntity,
    orderDetailsPayload: UpdateOrderDetailsPayload,
  ): OrderDetailsEntity => {
    const { audit } = details;

    const auditEntities: OrderAuditEntity[] = audit.map((auditItem) => ({
      id: auditItem.id,
      date: auditItem.date,
      description: auditItem.description,
      details,
      responsible: auditItem.responsible,
    }));

    const orderProducts = orderDetailsPayload.products.map(product => {
      return {
        id: product.id || uuid(),
        sku: product.sku,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        details
      }
    })

    const newAudit = {
      id: uuid(),
      date: new Date().toISOString(),
      description: 'Update',
      details,
      responsible: 'ADMIN', // TODO: add responsible from token
    };

    auditEntities.push(newAudit);

    return {
      ...orderDetailsPayload,
      order,
      products: orderProducts,
      audit: auditEntities,
    };
  };
}
