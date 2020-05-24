# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

c = Company.create name: "Compañía de prueba", email: "c@c.com", password: "12345678", username: "company"
u = User.create name: "Fabio Tovar", email: "u@c.com", password: "12345678", username: "fabiostovarr"
h = HeadHunter.create name: "Test", email: "h@c.com", password: "12345678", username: "headhunter"
h2 = HeadHunter.create name: "Test2", email: "h2@c.com", password: "12345678", username: "headhunter2"

u.head_hunters << h
c.head_hunters << h
u.head_hunters << h2
c.head_hunters << h2

