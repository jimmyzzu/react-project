from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

app = Flask(__name__)
CORS(app)  # 允许跨域请求

# 模型和分词器配置
model_name = "distilbert/distilgpt2"
tokenizer = AutoTokenizer.from_pretrained(model_name, legacy=False)
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    use_safetensors=True,
    torch_dtype=torch.float32,
    low_cpu_mem_usage=True
)

# 确保分词器有pad_token（GPT2系列默认没有）
if tokenizer.pad_token is None:
    tokenizer.pad_token = tokenizer.eos_token  # 使用结束token作为填充token

@app.route("/generate", methods=["POST"])
def generate():
    try:
        # 获取并验证输入
        data = request.json
        if not data or "prompt" not in data:
            return jsonify({"error": "缺少prompt参数"}), 400
        
        prompt = data["prompt"].strip()
        if not prompt:  # 防止空输入
            return jsonify({"error": "prompt不能为空"}), 400
        
        # 处理输入
        inputs = tokenizer(
            prompt,
            return_tensors="pt",
            padding=True,
            truncation=True,
            max_length=100  # 限制输入长度
        ).to("cpu")
        
        # 确保有有效的input_ids
        if inputs["input_ids"].numel() == 0:
            return jsonify({"error": "输入处理失败，无法生成有效序列"}), 400
        
        # 生成文本
        outputs = model.generate(
            **inputs,
            max_new_tokens=50,
            do_sample=True,  # 改为True可能更稳定
            pad_token_id=tokenizer.pad_token_id,
            eos_token_id=tokenizer.eos_token_id
        )
        
        # 解码结果
        text = tokenizer.decode(outputs[0], skip_special_tokens=True)
        return jsonify({"response": text})
    
    except Exception as e:
        # 捕获并返回详细错误信息
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8010, debug=True)
    