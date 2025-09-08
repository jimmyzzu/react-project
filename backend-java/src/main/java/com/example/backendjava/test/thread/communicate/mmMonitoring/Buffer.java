package com.example.backendjava.test.thread.communicate.mmMonitoring;

public class Buffer {
    private int data;
    private boolean hasData = false; // is buffer full
    public synchronized void produce(int value) throws InterruptedException {
        while (hasData) {
            wait(); // if buffer is full, producer waits
        }
        data = value;
        hasData = true;
        System.out.println("生产者生产: " + value);
        notifyAll(); // wake up consumers
    }

    public synchronized int consume() throws InterruptedException {
        while (!hasData) {
            wait(); // wait if buffer is empty
        }
        int value = data;
        hasData = false;
        System.out.println("消费者消费: " + value);
        notifyAll(); // wake up producers
        return value;
    }
}
