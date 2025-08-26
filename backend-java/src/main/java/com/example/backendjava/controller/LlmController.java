package com.example.backendjava.controller;

import com.example.backendjava.dto.ResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.Map;

@RestController
@RequestMapping("/api/llm")
@CrossOrigin(origins = "*")
public class LlmController {

    @PostMapping("/complete")
    public ResponseEntity<ResponseDto<String>> complete(@RequestBody Map<String, Object> body) {
        String text = String.valueOf(body.getOrDefault("text", ""));
        if (text == null || text.isBlank()) {
            return ResponseEntity.ok(ResponseDto.fail("text 不能为空"));
        }

        String provider = System.getenv().getOrDefault("LLM_PROVIDER", "openai");
        try {
            String result;
            if ("openai".equalsIgnoreCase(provider)) {
                // 调用 OpenAI 兼容端点（需配置 LLM_API_BASE、LLM_API_KEY、LLM_MODEL）
                String base = System.getenv().getOrDefault("LLM_API_BASE", "https://api.openai.com/v1");
                String apiKey = System.getenv().getOrDefault("LLM_API_KEY", "");
                String model = System.getenv().getOrDefault("LLM_MODEL", "gpt-3.5-turbo");
                if (apiKey.isEmpty()) {
                    return ResponseEntity.ok(ResponseDto.fail("未配置 LLM_API_KEY"));
                }
                String payload = "{\"model\":\"" + model + "\",\"messages\":[{\"role\":\"user\",\"content\":\"" + text.replace("\"","\\\"") + "\"}]}";
                HttpRequest req = HttpRequest.newBuilder()
                        .uri(URI.create(base + "/chat/completions"))
                        .timeout(Duration.ofSeconds(30))
                        .header("Authorization", "Bearer " + apiKey)
                        .header("Content-Type", "application/json")
                        .POST(HttpRequest.BodyPublishers.ofString(payload))
                        .build();
                HttpClient client = HttpClient.newHttpClient();
                HttpResponse<String> resp = client.send(req, HttpResponse.BodyHandlers.ofString());
                if (resp.statusCode() >= 200 && resp.statusCode() < 300) {
                    result = resp.body();
                } else {
                    return ResponseEntity.ok(ResponseDto.fail("LLM 调用失败: " + resp.statusCode()));
                }
            } else {
                // mock 回显
                result = "Echo: " + text;
            }
            return ResponseEntity.ok(ResponseDto.success(result));
        } catch (Exception e) {
            return ResponseEntity.ok(ResponseDto.fail("调用异常: " + e.getMessage()));
        }
    }
}


