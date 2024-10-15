import config from '../../config';
import db from '../../loaders/database';
import { ERRORS } from '../../shared/constants';
import type {
  centralRecruitmentSchemaType,
  recruitmentSchemaType,
} from './recruitments.schema';

export async function createRecruitment(
  candidate: recruitmentSchemaType,
): Promise<centralRecruitmentSchemaType> {
  const candidates = (await db()).collection<centralRecruitmentSchemaType>(
    'recruitments',
  );

  const existingCandidate = await candidates.findOne({
    $or: [
      { registrationNumber: candidate.registrationNumber },
      { collegeMail: candidate.collegeMail },
    ],
  });

  if (existingCandidate) {
    throw {
      statusCode: ERRORS.USER_ALREADY_EXISTS.statusCode,
      message: ERRORS.USER_ALREADY_EXISTS.message.error_description,
    };
  }

  const result: centralRecruitmentSchemaType = {
    ...candidate,
    registeredAt: new Date().toISOString(),
  };

  await candidates.insertOne(result);
  return result;
}

export async function getRecruitments(
  password: string,
): Promise<centralRecruitmentSchemaType[]> {
  if (password !== config.PASSWORD) {
    throw {
      statusCode: ERRORS.ACCESS_FORBIDDEN.statusCode,
      message: ERRORS.ACCESS_FORBIDDEN.message.error_description,
    };
  }
  const candidates = (await db()).collection<centralRecruitmentSchemaType>(
    'recruitments',
  );
  return candidates.find().toArray();
}
