package com.example.backendjava.test.thread.communicate.blockingQueue;

import java.util.concurrent.BlockingQueue;

public class Consumer implements Runnable {
    private BlockingQueue<Integer> queue;

    public Consumer(BlockingQueue<Integer> queue) {
        this.queue = queue;
    }

    @Override
    public void run() {
        try {
            for (int i = 1; i <= 5; i++) {
                int value = queue.take(); // automatically waits if the queue is empty
                System.out.println("消费者消费: " + value);
                Thread.sleep(1000); // mock processing time
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
