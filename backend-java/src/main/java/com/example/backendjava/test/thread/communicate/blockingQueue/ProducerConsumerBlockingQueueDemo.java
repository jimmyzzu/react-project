package com.example.backendjava.test.thread.communicate.blockingQueue;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

public class ProducerConsumerBlockingQueueDemo {
    public static void main(String[] args) {
        BlockingQueue<Integer> queue = new ArrayBlockingQueue<>(2); // capacity of 2
        new Thread(new Producer(queue)).start();
        new Thread(new Consumer(queue)).start();
    }
}