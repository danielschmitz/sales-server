
exports.seed = async function (knex) {
  await knex('employees').del()
  const addressBossId = await knex('addresses').insert(
    {
      'street': 'Boss Street',
      'city': 'Boss City',
      'region': 'Boss Region',
      'postalCode': 'Boss Postal Code',
      'country': 'Boss Country',
      'phone': 'Boss Phone'
    }
  ).returning('id')

  const bossId = await knex('employees').insert({
    'firstName': 'Boss',
    'lastName': 'Doe',
    'title': 'Sr.',
    'birthDate': Date.UTC(1990, 10, 20),
    'hireDate': Date.now(),
    'address_id': addressBossId
  }).returning('id')

  const addressEmployeeId = await knex('addresses').insert(
    {
      'street': 'Employee Street',
      'city': 'Employee City',
      'region': 'Employee Region',
      'postalCode': 'Employee Postal Code',
      'country': 'Employee Country',
      'phone': 'Employee Phone'
    }
  ).returning('id')

  const employeeId1 = await knex('employees').insert({
    'firstName': 'Employee 1',
    'lastName': 'Hug',
    'title': 'Sr.',
    'birthDate': Date.UTC(1999, 8, 13),
    'hireDate': Date.now(),
    'address_id': addressEmployeeId,
    'reports_to': bossId
  }).returning('id')

  const employeeId2 = await knex('employees').insert({
    'firstName': 'Employee 2',
    'lastName': 'Nut',
    'title': 'Sr.',
    'birthDate': Date.UTC(2002, 7, 21),
    'hireDate': Date.now(),
    'address_id': addressEmployeeId,
    'reports_to': bossId
  }).returning('id')

  return [bossId, employeeId1, employeeId2]

};
