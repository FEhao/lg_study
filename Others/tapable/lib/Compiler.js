const fs = require("fs");
const path = require("path");
const babylon = require("babylon");
const t = require("@babel/types");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;

class Compiler {
  constructor(config) {
    this.config = config;
    this.entryId;
    this.modules = {};
    this.entry = config.entry;
    this.root = process.cwd();
  }

  getSource(modulePath) {
    let content = fs.readFileSync(modulePath, "utf-8");
    return content;
  }

  parse(source, parentPath) {
    let ast = babylon.parse(source);
    let dependencies = [];
    traverse(ast, {
      CallExpression({ node }) {
        if (node.callee.name === "require") {
          node.callee.name = "__webpack_require__";
          let moduleName = node.arguments[0].value;
          moduleName += `${path.extname(moduleName) ? "" : ".js"}`;
          moduleName = "./" + path.join(parentPath, moduleName);
          dependencies.push(moduleName);
          node.arguments = [t.stringLiteral(moduleName)];
        }
      },
    });

    let sourceCode = generator(ast).code;

    return { sourceCode, dependencies };
  }

  buildModule(modulePath, isEntry) {
    //  模块内容
    let source = this.getSource(modulePath);
    //  模块id
    let moduleName = "./" + path.relative(this.root, modulePath);

    if (isEntry) {
      this.entryId = moduleName;
    }

    //解析，返回依赖列表
    let { sourceCode, dependencies } = this.parse(
      source,
      path.dirname(moduleName)
    );

    console.log(sourceCode, dependencies);

    this.modules[moduleName] = sourceCode;

    dependencies.forEach((dep) => {
      this.buildModule(path.join(this.root, dep), false);
    });
  }

  emitFile() {}

  run() {
    this.buildModule(path.relative(this.root, this.entry), true);
    console.log(this.modules);
  }
}

module.exports = Compiler;
