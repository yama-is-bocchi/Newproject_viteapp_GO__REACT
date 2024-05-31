package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"time"
)
// Lock holds the schema definition for the Lock entity.
type Lock struct {
	ent.Schema
}

// Fields of the Lock.
func (Lock) Fields() []ent.Field {
	return []ent.Field{
		field.Int("user_id").
			Unique(),
		field.Time("date").
			Default(time.Now),
	}
}

// Edges of the Lock.
func (Lock) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).
			Ref("locks").
			Field("user_id").
			Unique().
			Required(),
	}
}
