import openai

openai.api_key = "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"

response = openai.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "あなたは優秀なAIアシスタントです。"},
        {"role": "user", "content": "架空のニュース記事を書いてください。"}
    ],
    max_tokens=100,
    temperature=0.7
)

print(response.choices[0].message.content.strip())