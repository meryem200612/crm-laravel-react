<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        // Créer l'admin par défaut
        User::updateOrCreate(
            ['email' => 'admin@mjinformatique.dz'],
            [
                'name'     => 'Administrateur',
                'password' => Hash::make('password'),
                'role'     => 'admin',
            ]
        );

        // Créer un technicien de démonstration
        User::updateOrCreate(
            ['email' => 'tech@mjinformatique.dz'],
            [
                'name'     => 'Technicien Demo',
                'password' => Hash::make('password'),
                'role'     => 'technicien',
            ]
        );
    }
}
