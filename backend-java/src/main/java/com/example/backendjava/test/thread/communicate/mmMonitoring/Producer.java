package com.example.backendjava.test.thread.communicate.mmMonitoring;

public class Producer extends Thread {
    private Buffer buffer;

    public Producer(Buffer buffer) {
        this.buffer = buffer;
    }

    @Override
    public void run() {
        try {
            for (int i = 1; i <= 5; i++) {
                buffer.produce(i);
                Thread.sleep(500); // mock processing time
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
