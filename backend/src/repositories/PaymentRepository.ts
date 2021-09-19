import {EntityRepository, Repository} from "typeorm";
import { Payment } from "../entities/Payment";

@EntityRepository(Payment)
export class PaymentRepository extends Repository<Payment> {}
