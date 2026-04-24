<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Intervention;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        $totalClients       = Client::count();
        $totalInterventions = Intervention::count();
        $enAttente          = Intervention::where('statut', 'en_attente')->count();
        $enCours            = Intervention::where('statut', 'en_cours')->count();
        $terminees          = Intervention::where('statut', 'terminé')->count();
        $totalTechniciens   = User::where('role', 'technicien')->count();

        $recentInterventions = Intervention::with(['client', 'technicien'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return response()->json([
            'total_clients'        => $totalClients,
            'total_interventions'  => $totalInterventions,
            'en_attente'           => $enAttente,
            'en_cours'             => $enCours,
            'terminees'            => $terminees,
            'total_techniciens'    => $totalTechniciens,
            'recent_interventions' => $recentInterventions,
        ]);
    }
}
