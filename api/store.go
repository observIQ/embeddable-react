package api

import (
	"errors"

	"github.com/google/uuid"
)

var ErrNotFound = errors.New("not found")

type Store interface {
	Create(description string) todo
	Check(id string, completed bool) (todo, error)
	Delete(id string)
	List() []todo
}

type store struct {
	todos map[string]*todo
}

type todo struct {
	ID          string `json:"id"`
	Description string `json:"description"`
	Completed   bool   `json:"completed"`
}

func newStore() Store {
	s := &store{
		todos: make(map[string]*todo),
	}
	s.Seed()
	return s
}

func (s *store) Seed() {
	id1 := uuid.NewString()
	s.todos[id1] = &todo{
		ID:          id1,
		Description: "Pick up dry cleaning",
		Completed:   true,
	}

	id2 := uuid.NewString()
	s.todos[id2] = &todo{
		ID:          id2,
		Description: "Grab coffee",
		Completed:   false,
	}

	id3 := uuid.NewString()
	s.todos[id3] = &todo{
		ID:          id3,
		Description: "Solve world hunger",
		Completed:   false,
	}
}

func (s *store) Create(description string) todo {
	id := uuid.NewString()
	new := &todo{
		ID:          id,
		Description: description,
	}
	s.todos[id] = new
	return *new
}

func (s *store) Check(id string, completed bool) (todo, error) {
	var checked *todo

	checked = s.todos[id]
	if checked == nil {
		return *checked, ErrNotFound
	}

	checked.Completed = completed

	return *checked, nil
}

func (s *store) Delete(id string) {
	delete(s.todos, id)
}

func (s *store) List() []todo {
	todos := make([]todo, 0)

	for _, t := range s.todos {
		todos = append(todos, *t)
	}

	return todos
}
