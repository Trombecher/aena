Remove-Item ./dist/ -Recurse;
bunx tsc;
Copy-Item ./src/*.js ./dist/;
Copy-Item ./src/*.d.ts ./dist/;