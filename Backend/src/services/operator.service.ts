import AppDataSource from "../config/connectDB"
import appAssert from "../utils/appAssert";
import {CONFLICT} from "../constants/http";
import {OperatorReg} from "../schema/operatorSchema";
import {Operator} from "../models/operator.model";

const operatorRepository = AppDataSource.getRepository(Operator);
export const registerOperator = async(operatorData: OperatorReg) =>{

    const existingOperator = await operatorRepository.findOneBy({email: operatorData.email});
    appAssert(!existingOperator, CONFLICT,"User already exists");

    const user = operatorRepository.create(operatorData);
    console.log(user);
    await operatorRepository.save(user);

    return user;
}

export const getAllOperators = async (): Promise<Operator[]> => {
    const operatorData = await operatorRepository.find();
    console.log(operatorData);
    return operatorData;
};