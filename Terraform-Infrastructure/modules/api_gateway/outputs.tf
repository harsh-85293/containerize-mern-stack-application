output "api_id" {
  value = aws_apigatewayv2_api.main.id
}

output "invoke_url" {
  value = aws_apigatewayv2_stage.default.invoke_url
}
