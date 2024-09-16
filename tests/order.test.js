const request = require('supertest');
const express = require('express');
const app = require('../app');
const orderService = require('../services/orderService');

// Mock del servicio de pedidos
jest.mock('../services/orderService');

let server;
const PORT = 3001;

beforeAll(done => {
  server = app.listen(PORT, done);
});

afterAll(done => {
  if (server) {
    server.close(done);
  } else {
    done();
  }
});

describe('Order Management Service', () => {
  
  // Prueba para crear una orden
  describe('POST /orders', () => {
    it('should create a new order and return 201 status', async () => {
      const mockOrder = {
        product: 'Producto 1',
        quantity: 2,
        customerName: 'John Doe',
      };

      orderService.createOrder.mockResolvedValue({
        OrderID: '1',
        ...mockOrder,
        createdAt: new Date().toISOString(),
      });

      const res = await request(`http://localhost:${PORT}`)
        .post('/orders')
        .send(mockOrder);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('OrderID');
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await request(`http://localhost:${PORT}`).post('/orders').send({
        product: '',
        quantity: '',
        customerName: '',
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body.errors).toBeDefined();
    });
  });

  // Prueba para obtener todas las órdenes
  describe('GET /orders', () => {
    it('should return all orders with 200 status', async () => {
      const mockOrders = [
        { OrderID: '1', product: 'Producto 1', quantity: 2, customerName: 'John Doe' },
        { OrderID: '2', product: 'Producto 2', quantity: 1, customerName: 'Jane Doe' },
      ];

      orderService.getAllOrders.mockResolvedValue(mockOrders);

      const res = await request(`http://localhost:${PORT}`).get('/orders');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(mockOrders);
    });

    it('should return 404 if no orders are found', async () => {
      orderService.getAllOrders.mockResolvedValue([]); // Simula que no hay pedidos

      const res = await request(`http://localhost:${PORT}`).get('/orders');

      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toEqual('No se encuentran pedidos');
    });
  });
});
