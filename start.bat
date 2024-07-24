@echo off

if exist node_modules\ (
  node .
  pause
) else (
  call npm i >> NUL
  node .
  pause
)