import sqlalchemy
import sqlalchemy.ext.declarative
import sqlalchemy.orm

# engine = sqlalchemy.create_engine("sqlite:///:memory:", echo=True)
engine = sqlalchemy.create_engine("sqlite:///./database/orm_sqlalchemy.sqlite", echo=True)


Base = sqlalchemy.ext.declarative.declarative_base()


class Person(Base):
    __tablename__ = 'persons'
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, autoincrement=True)
    name = sqlalchemy.Column(sqlalchemy.String(14))


Base.metadata.create_all(engine)

Session = sqlalchemy.orm.sessionmaker(bind=engine)
session = Session()

print('#######')
p1 = Person(name='Mike')
session.add(p1)
session.commit()

p2 = Person(name='Nancy')
session.add(p2)
p3 = Person(name='Jun')
session.add(p3)
session.commit()

print('#######')
p4 = session.query(Person).filter_by(name='Mike').first()
print(p4.name)
p4.name = 'Michel'
session.add(p4)
session.commit()

print('#######')
p5 = session.query(Person).filter_by(name='Nancy').first()
session.delete(p5)
session.commit()

print('#######')
persons = session.query(Person).all()
for person in persons:
    print(person.id, person.name)
