import { fakerPT_BR as faker } from '@faker-js/faker';
import { db } from './instance.ts';
import { userSchema } from './schema/user-schema.ts';
import { courseSchema } from './schema/course-schema.ts';
import { enrollmentSchema } from './schema/enrollment-schema.ts';



async function seed() {
  const userData = Array.from({ length: 10 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
  }));
  const insertedUsers = await db.insert(userSchema).values(userData).returning();

  const courseData = Array.from({ length: 5 }).map(() => ({
    title: faker.lorem.words(3),
    description: faker.lorem.sentence(),
  }));
  const insertedCourses = await db.insert(courseSchema).values(courseData).returning();


  await db.insert(enrollmentSchema).values([
    { userId: insertedUsers[0].id, courseId: insertedCourses[0].id },
    { userId: insertedUsers[1].id, courseId: insertedCourses[1].id },
    { userId: insertedUsers[2].id, courseId: insertedCourses[1].id },
    { userId: insertedUsers[2].id, courseId: insertedCourses[2].id },
    { userId: insertedUsers[3].id, courseId: insertedCourses[3].id },
    { userId: insertedUsers[4].id, courseId: insertedCourses[4].id },
  ]);

  console.log('Seeding completed!');
  await db.$client.end();
}

seed().catch((err) => {
  console.error(err);
  db.$client.end();
});