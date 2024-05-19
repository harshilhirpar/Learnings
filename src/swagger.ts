// src/swagger.ts
import YAML from 'yamljs';
import path from 'path';

const swaggerSpec = YAML.load(path.join(__dirname, './swagger/apis.yaml'));

export default swaggerSpec;
