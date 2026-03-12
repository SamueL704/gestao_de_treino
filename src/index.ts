// Import the framework and instantiate it
import Fastify from "fastify";
import {
  createSerializerCompiler,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import "dotenv/config";
import z, { ZodType } from "zod";

const app = Fastify({
  logger: true,
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.withTypeProvider<ZodTypeProvider>().route({
    method: "GET",
    url: "/",
    schema: {
        description: "hello world",
        tags: ["hello world"],
        response: {
            200: z.object({
                message:z.string(),
            }),
        },
    },
    handler: () => {
        return {
            message: "hello world",
        }
    }
});

try {
  await app.listen({ port: Number(process.env.PORT) || 8081 });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
