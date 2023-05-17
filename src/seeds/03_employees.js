exports.seed = async function (knex) {
  console.log("seed employees")
  await knex("employees").del()
  const addressBossId = await knex("addresses").insert({
    street: "Boss Street",
    city: "Boss City",
    region: "Boss Region",
    postalCode: "Boss Postal Code",
    country: "Boss Country",
    phone: "Boss Phone",
  })

  const bossId = await knex("employees").insert({
    firstName: "Boss",
    lastName: "Doe",
    title: "Sr.",
    birthDate: new Date("October 15, 1976").toISOString(),
    hireDate: new Date().toISOString(),
    address_id: addressBossId[0],
  })

  const addressEmployeeId = await knex("addresses").insert({
    street: "Employee Street",
    city: "Employee City",
    region: "Employee Region",
    postalCode: "Employee Postal Code",
    country: "Employee Country",
    phone: "Employee Phone",
  })

  const employeeId1 = await knex("employees").insert({
    firstName: "Employee 1",
    lastName: "Hug",
    title: "Sr.",
    birthDate: new Date("December 1, 1980").toISOString(),
    hireDate: new Date().toISOString(),
    address_id: addressEmployeeId[0],
    reports_to: bossId[0],
  })

  const employeeId2 = await knex("employees").insert({
    firstName: "Employee 2",
    lastName: "Nut",
    title: "Sr.",
    birthDate: new Date("December 1, 1980").toISOString(),
    address_id: addressEmployeeId[0],
    hireDate: new Date().toISOString(),
    reports_to: bossId[0],
  })

  return [bossId, employeeId1, employeeId2]
}
