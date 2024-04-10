import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
    @Prop()
    user_id: String;
    @Prop()
    username: String;
    @Prop()
    password: String;
    @Prop()
    email: String;
}

export const UserSchema = SchemaFactory.createForClass(User);